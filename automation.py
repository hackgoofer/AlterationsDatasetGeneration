from selenium import webdriver
import time
import random
import math
import json

# Utility Methods
def random_number(mmin, mmax, step):
    delta = mmax - mmin + step
    rrange = delta / step
    rand = random.random()
    rand *= rrange
    rand = math.floor(rand)
    rand *= step
    rand += mmin
    return float("{:.2f}".format(rand))


def get_params_tnc(nl, name_val):
    seed = random.randint(0, 10000000)
    random.seed(seed)
    params = {
        "seed": seed,
        "ng": random_number(1, 60, 1),
        "rth": random_number(0, 1, 0.1),
        "sw": random_number(1, 7, 1),
        "pid": random_number(0, 4, 1),
        "dl": random_number(0, 1, 1),
        "curvy": c,
        "name": name_val,
        "M": [random.random() for _ in range(9000)]
    }

    num_grid = int(params["ng"])
    params["ng1"] = [random.random() for _ in range(num_grid * num_grid)]
    params["ng2"] = [random.random() for _ in range(num_grid * num_grid)]
    params["ng3"] = [random.random() for _ in range(num_grid * num_grid)]
    return params


### Tiles & Cushions
def get_params_tnc(c, name_val):
    seed = random.randint(0, 10000000)
    random.seed(seed)
    params = {
        "seed": seed,
        "ng": random_number(1, 60, 1),
        "rth": random_number(0, 1, 0.1),
        "sw": random_number(1, 7, 1),
        "pid": random_number(0, 4, 1),
        "dl": random_number(0, 1, 1),
        "curvy": c,
        "name": name_val,
        "M": [random.random() for _ in range(9000)]
    }

    num_grid = int(params["ng"])
    params["ng1"] = [random.random() for _ in range(num_grid * num_grid)]
    params["ng2"] = [random.random() for _ in range(num_grid * num_grid)]
    params["ng3"] = [random.random() for _ in range(num_grid * num_grid)]
    return params


### Spractal Code
def get_params_spractal(ol, name_val):
    seed = random.randint(0, 10000000)
    random.seed(seed)
    params = {
        "seed": seed,
        "rc": random_number(0, 1, 0.1),
        "droptiny": random_number(0, 1, 0.1),
        "droplarge": random_number(0, 1, 0.1),
        "droprest": random_number(0, 1, 0.1),
        "nu": random_number(0, 0.1, 0.01),
        "fci": random_number(0, 11, 1),
        "eci": random_number(0, 2, 1),
        "ew": random_number(1, 10, 1),
        "overlap": ol,
        "name": name_val,
    }

    chance = params["rc"]

    num_trials = 9000
    params["fff"] = [random.random() for _ in range(num_trials)]
    params["f1"] = [random.random() for _ in range(num_trials)]
    params["f2"] = [random.random() for _ in range(num_trials)]
    params["f3"] = [random.random() for _ in range(num_trials)]
    params["f4"] = [random.random() for _ in range(num_trials)]

    params["f11"] = [random.random() for _ in range(num_trials)]
    params["f22"] = [random.random() for _ in range(num_trials)]
    params["f33"] = [random.random() for _ in range(num_trials)]
    params["f44"] = [random.random() for _ in range(num_trials)]

    params["f111"] = [random.random() for _ in range(num_trials)]
    params["f222"] = [random.random() for _ in range(num_trials)]
    params["f333"] = [random.random() for _ in range(num_trials)]
    params["f444"] = [random.random() for _ in range(num_trials)]
    return params


## Stroke Code
def get_params_strokes(sw, name_val):
    seed = random.randint(0, 10000000)
    random.seed(seed)
    params = {
        "seed": seed,
        "numTrials": random_number(0, 10, 1),
        "strokeWidth": sw,
        "pid": random_number(0, 4, 1),
        "cid": random_number(0, 1, 0.1),
        "p0": random_number(0, 1, 0.1),
        "p1": random_number(0, 1, 0.1),
        "name": name_val,
    }
    num_trials = int(params["numTrials"])

    params["trials0"] = [random.random() for _ in range(num_trials)]
    params["trials1"] = [random.random() for _ in range(num_trials)]
    params["trials2"] = [random.random() for _ in range(num_trials)]
    params["trials3"] = [random.random() for _ in range(num_trials)]

    params["checks"] = [random.random() for _ in range(num_trials)]
    params["checks1"] = [random.random() for _ in range(num_trials)]
    params["checks2"] = [random.random() for _ in range(num_trials)]
    params["checks3"] = [random.random() for _ in range(num_trials)]
    params["checks4"] = [random.random() for _ in range(num_trials)]
    params["checks5"] = [random.random() for _ in range(num_trials)]
    params["checks6"] = [random.random() for _ in range(num_trials)]
    params["checks7"] = [random.random() for _ in range(num_trials)]
    params["checks8"] = [random.random() for _ in range(num_trials)]
    return params

## Leaves Code
def get_params_leaves(vc, name_val):
    static = static_params_leaves()
    dynamic = dynamic_params_leaves()
    seed = random.randint(0, 10000000)
    random.seed(seed)
    params = {"seed": seed}

    for name, val in dynamic.items():
        mmin = dynamic[name][0]
        mmax = dynamic[name][1]
        step = dynamic[name][2]
        rand = random_number(mmin, mmax, step)
        params[name] = rand
        if name == "numColumns":
            gridWidth = rand
        if name == "numRows":
            gridHeight = rand

    assert gridWidth != None and gridHeight != None

    dependent = dependent_params_leaves(gridWidth, gridHeight)
    for name, val in dependent.items():
        val = int(val)
        params[name] = [random.random() for _ in range(val)]

    params["verticalSize"] = vc
    params["name"] = name_val
    return params

def static_params_leaves():
    return {'verticalSize': [0.01, 1, 0.01]}

def dynamic_params_leaves():
    return {
        # take the form of alteration_name: [min, max, optional_step]
        "palette": [0, 12, 1],
        "numColumns": [1, 50, 1],
        "numRows": [1, 50, 1],
        "gridNoise": [0, 1, 0.05],
        "offsetLeft": [-1, 1, 0.05],
        "offsetRight": [-1, 1, 0.05],
        "drop": [0, 0.95, 0.05],
        "edgeColor": [0, 4, 1],
        "strokeWidth": [0, 6, 0.2],
        "cid": [0, 1, 0.1]
    }

def dependent_params_leaves(width, height):
    return {
        "mux": width*height,
        "muy": width*height,
        "check": width*height,
        "check_drop": width*height,
        "cids": width*height,
        "muy2": width*height,
        "mux_w": width,
        "muy_w": width
    }


driver = webdriver.Chrome("/Users/sash/local/chromedriver")
driver.get("localhost:8000/generation.html")
time.sleep(2)
num_rounds = 10

# leaves
# for i in range(num_rounds):
#     params = get_params_leaves(0.25, "_A")
#     params_str = json.dumps(params)
#     driver.execute_script(f"start({params_str})")
#     time.sleep(2)
#     driver.refresh()
#     time.sleep(2)

#     params["verticalSize"] = 0.35
#     params["name"] = "_B"
#     params_str = json.dumps(params)
#     driver.execute_script(f"start({params_str})")
#     time.sleep(4)
#     driver.refresh()
#     print(f"Done leaves round {i} of {num_rounds}")


# strokes
# for i in range(num_rounds):
#     params = get_params_strokes(5, "_A")
#     params_str = json.dumps(params)
#     driver.execute_script(f"start({params_str})")
#     time.sleep(2)
#     driver.refresh()
#     time.sleep(2)

#     params["strokeWidth"] = 10
#     params["name"] = "_B"
#     params_str = json.dumps(params)
#     driver.execute_script(f"start({params_str})")
#     time.sleep(4)
#     driver.refresh()
#     print(f"Done Strokes round {i} of {num_rounds}")

# Spractal
# for i in range(num_rounds):
#     params = get_params_spractal(0.8, "_A")
#     params_str = json.dumps(params)
#     driver.execute_script(f"start({params_str})")
#     time.sleep(2)
#     driver.refresh()
#     time.sleep(2)

#     params["overlap"] = 1
#     params["name"] = "_B"
#     params_str = json.dumps(params)
#     driver.execute_script(f"start({params_str})")
#     time.sleep(5)
#     driver.refresh()
#     print(f"Done Spractal round {i} of {num_rounds}")

# Tiles and cushions
for i in range(num_rounds):
    params = get_params_tnc(1, "_A")
    params_str = json.dumps(params)
    driver.execute_script(f"start({params_str})")
    time.sleep(2)
    driver.refresh()
    time.sleep(2)

    params["curvy"] = 0
    params["name"] = "_B"
    params_str = json.dumps(params)
    driver.execute_script(f"start({params_str})")
    time.sleep(5)
    driver.refresh()
    print(f"Done TNC round {i} of {num_rounds}")


# Carpet
for i in range(num_rounds):
    params = get_params_carpet(3, "_A")
    params_str = json.dumps(params)
    driver.execute_script(f"start({params_str})")
    time.sleep(2)
    driver.refresh()
    time.sleep(2)

    params["nl"] = 4
    params["name"] = "_B"
    params_str = json.dumps(params)
    driver.execute_script(f"start({params_str})")
    time.sleep(5)
    driver.refresh()
    print(f"Done Carpet round {i} of {num_rounds}")
